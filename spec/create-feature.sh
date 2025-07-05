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

# README 생성
cat > "$FEATURE_DIR/README.md" << EOF
# $FEATURE_NAME 기능 개발

## 📋 개발 단계
1. ✅ 폴더 생성 완료
2. ⏳ user-spec.md 작성 필요
3. ⏳ enhance 요청
4. ⏳ enhanced-spec.md 검토
5. ⏳ implementation-plan.md 작성
6. ⏳ 개발 시작

## 📁 폴더 구조
- user-spec.md: 사용자가 작성하는 기능정의서
- enhanced-spec.md: Claude가 enhance한 정의서
- implementation-plan.md: Claude가 작성한 개발계획서
- assets/: 관련 이미지, 와이어프레임 등

## 🚀 다음 단계
1. user-spec.md를 열고 기능 요구사항을 작성해주세요
2. 작성 완료 후 Claude에게 "enhance 해줘"라고 말씀해주세요
EOF

echo "✅ 기능 폴더 생성 완료!"
echo "📂 경로: $FEATURE_DIR"
echo "📝 다음 단계: user-spec.md 파일을 편집해주세요"
echo ""
echo "🔗 바로 편집하기:"
echo "   code $FEATURE_DIR/user-spec.md"