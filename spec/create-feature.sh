#!/bin/bash

# 새로운 기능 폴더 생성 스크립트

if [ -z "$1" ]; then
    echo "사용법: ./create-feature.sh [기능명]"
    echo "예시: ./create-feature.sh user-profile"
    exit 1
fi

FEATURE_NAME=$1
FEATURE_DIR="spec/$FEATURE_NAME"

# 기능 폴더 생성
if [ -d "$FEATURE_DIR" ]; then
    echo "❌ 이미 존재하는 기능입니다: $FEATURE_NAME"
    exit 1
fi

echo "📁 기능 폴더 생성 중: $FEATURE_NAME"
mkdir -p "$FEATURE_DIR"
mkdir -p "$FEATURE_DIR/assets"

# 사용자 기능정의서 복사
cp "spec/template-user.md" "$FEATURE_DIR/user-spec.md"
sed -i.bak "s/\[기능명\]/$FEATURE_NAME/g" "$FEATURE_DIR/user-spec.md"
rm "$FEATURE_DIR/user-spec.md.bak"

# development-report.md 템플릿 복사 (주석 처리 - 개발 완료 후 수동 생성)
# cp "spec/template-development-report.md" "$FEATURE_DIR/development-report.md"
# sed -i.bak "s/\[기능명\]/$FEATURE_NAME/g" "$FEATURE_DIR/development-report.md"
# rm "$FEATURE_DIR/development-report.md.bak"

echo "✅ 기능 폴더 생성 완료!"
echo "📂 경로: $FEATURE_DIR"
echo "📝 다음 단계: user-spec.md 파일을 편집해주세요"
echo ""
echo "🔗 바로 편집하기:"
echo "   code $FEATURE_DIR/user-spec.md"
echo ""
echo "💡 참고: development-report.md는 개발 완료 후 template-development-report.md를 복사해서 작성하세요"